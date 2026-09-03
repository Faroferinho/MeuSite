package svs.content.projects.Objects;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class FileSignature {
    @Getter
    @Setter
    public String fileName;
    public List<String> expectedSignatures;
    public String actualSignature;
    public boolean matchSignature;


    public FileSignature() {
    }


    public FileSignature(String fileName, List<String> expectedSignatures, String actualSignature, boolean match_signature) {
        this.fileName = fileName;
        this.expectedSignatures = expectedSignatures;
        this.actualSignature = actualSignature;
        this.matchSignature = match_signature;
    }

    public void printInfo(){
        System.out.println(fileName +
                "   expected signatures: " + expectedSignatures +
                "   actual_signature: " + actualSignature +
                "   match: " + matchSignature);
    }
}
