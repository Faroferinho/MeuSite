package svs.content.projects.Objects;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FileSignature {
    @Getter
    @Setter
    public String filename;
    public List<String> expectedSignatures;
    public String actual_signature;
    public boolean match_signature;


    public FileSignature() {
    }


    public FileSignature(String filename, List<String> expectedSignatures, String actual_signature, boolean match_signature) {
        this.filename = filename;
        this.expectedSignatures = expectedSignatures;
        this.actual_signature = actual_signature;
        this.match_signature = match_signature;
    }

    public void printInfo(){
        System.out.println(filename +
                "   expected signatures: " + expectedSignatures +
                "   actual_signature: " + actual_signature +
                "   match: " + match_signature);
    }
}
