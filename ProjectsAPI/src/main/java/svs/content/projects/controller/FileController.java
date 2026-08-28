package svs.content.projects.controller;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Arrays;

@RestController
public class FileController {

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    private String uploadFile(@RequestParam("file") MultipartFile file){
        String filePath = System.getProperty("user.dir") + "/Uploads" + File.separator + file.getOriginalFilename();
        String fileUploadStatus;

        try {
            FileOutputStream fileOutputStream = new FileOutputStream(filePath);
            fileOutputStream.write(file.getBytes());

            fileOutputStream.close();
            fileUploadStatus = "File Uploaded Successfully";
        } catch (FileNotFoundException e) {
            fileUploadStatus = "Error Uploading File :(";
            throw new RuntimeException(e);
        } catch (IOException e) {
            fileUploadStatus = "Error Uploading File :(";
            throw new RuntimeException(e);
        }
        return fileUploadStatus;

    }

    @RequestMapping(value = "/download/{path:.+}", method = RequestMethod.GET)
    private String[] getListOfFiles(){
        String folderPath = System.getProperty("user.dir") + "/Uploads";

        File directory = new File(folderPath);

        return directory.list();
    }

    @RequestMapping(value = "/download/{path:.+}")
    private ResponseEntity downloadFile(@PathVariable("path") String filename) throws FileNotFoundException{
        String fileUploadPath = System.getProperty("user.dir") + "/Uploads";
        String fileNames[] = this.getListOfFiles();
        boolean contains = Arrays.asList(fileNames).contains(fileUploadPath);

        if(!contains){
            return new ResponseEntity("File Not Found lol", HttpStatus.NOT_FOUND);
        }

        String filePath = fileUploadPath + File.separator + filename;

        File file = new File(filePath);

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();

        String contentType = "application/octet-stream";
        String headerValue = "attatchment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

}