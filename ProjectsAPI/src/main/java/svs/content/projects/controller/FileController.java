package svs.content.projects.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import svs.content.projects.Objects.FileSignature;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
public class FileController {

    private static final String SIGNATURES = "http://magic-numbers:8000/check-signature";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${file_storage_volume:/app/data/files}")
    private String sharedPath;

    @CrossOrigin(origins = "http://localhost:5173")
    @RequestMapping(value = "/filesignature", method = RequestMethod.POST)
    private ResponseEntity<FileSignature> uploadFile(@RequestParam("file") MultipartFile file){
        String filePath = sharedPath + File.separator + file.getOriginalFilename() + ".temp";

        Map<String, String> parameters = new HashMap<>();

        FileSignature signature;

        try {
            FileOutputStream fileOutputStream = new FileOutputStream(filePath);
            fileOutputStream.write(file.getBytes());

            fileOutputStream.close();
        } catch (IOException e) {
            System.out.print("Error Uploading File :(");
            throw new RuntimeException(e);
        }

        filePath = removeTempExtension(file, filePath);

        System.out.println("File: " + filePath + " | URL: " + SIGNATURES);

        try {
            HttpRequest request = HttpRequest
                    .newBuilder(

                    ).uri(
                            URI.create(SIGNATURES)
                    ).header(
                            "file-path", filePath
                    ).GET().build();

            HttpResponse<String> response = HttpClient
                                                .newHttpClient()
                                                .send(
                                                        request,
                                                        HttpResponse.BodyHandlers.ofString()
                                                );

            if (response.statusCode() != HttpStatus.OK.value()){
                throw new RuntimeException("HTTP request failed with status code: " + response.statusCode());
            }

            JsonNode rootNode = objectMapper.readTree(response.body());

            String fileName = rootNode.path("signature").path("file_name").asString();
            List<String> expectedSignatures = Collections.emptyList();
            JsonNode listNode = rootNode.path("signature").path("expected_signatures");
            if (listNode.isArray()){
                expectedSignatures = objectMapper.convertValue(listNode, new TypeReference<List<String>>() {});
            }
            String fileSignature = rootNode.path("signature").path("actual_signature").asString();
            boolean match = rootNode.path("signature").path("match_signature").asBoolean();

            signature = new FileSignature(fileName, expectedSignatures, fileSignature, match);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        File downloadedFile = new File(sharedPath);
        downloadedFile.delete();

        return ResponseEntity.ok(signature);
    }

    private String removeTempExtension(MultipartFile file, String path){
        String fileName = file.getOriginalFilename();
        int lastDotIndex = fileName.length();
        int lastSlashIndex = path.lastIndexOf('/');

        Path originalPath = Path.of(path);
        fileName = fileName.substring(0, lastDotIndex);
        Path newPath = Path.of(path.substring(0, lastSlashIndex) + File.separator + fileName);

        try {
            Files.move(originalPath, newPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return newPath.toString();
    }
}