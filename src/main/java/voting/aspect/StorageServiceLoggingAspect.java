package voting.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

/**
 * Created by andrius on 2/27/17.
 */

@Aspect
@Component
public class StorageServiceLoggingAspect {

    private final Logger logger = Logger.getLogger(StorageServiceLoggingAspect.class);

    @Pointcut("execution(* voting.service.FileSystemStorageService.store(..)) && args(file)")
    void store(MultipartFile file) { }

    @AfterReturning(
            pointcut = "store(file)",
            returning = "returnValue",
            argNames = "jp,file,returnValue")
    public void afterStoringFile(JoinPoint jp, MultipartFile file, Path returnValue) {
        logger.debug(
                String.format("File [fileName: %s, type: %s] stored [location: %s] : %s",
                file.getOriginalFilename(), file.getContentType(), returnValue.toAbsolutePath(), jp.toLongString()));
    }

    @Pointcut("execution(* voting.service.FileSystemStorageService.storeTemporary(..))")
    void storeTemporary() { }

    @AfterReturning(
            pointcut = "storeTemporary()",
            returning = "returnValue",
            argNames = "jp,returnValue")
    public void afterStoringTempFile(JoinPoint jp, Path returnValue) {
        logger.debug(
                String.format("Temp file [fileName: %s] stored [location: %s] : %s",
                        returnValue.getFileName(), returnValue.toAbsolutePath(), jp.toLongString()));
    }

    @Pointcut(value = "execution(* voting.service.FileSystemStorageService.delete(..)) && args(filePath)", argNames = "filePath")
    void delete(Path filePath) { }

    @After(value = "delete(filePath)", argNames = "jp,filePath")
    public void afterDeleteTempFile(JoinPoint jp, Path filePath) {
        logger.debug(
                String.format("Temp file [fileName: %s] deleted [location: %s] : %s",
                        filePath.getFileName(), filePath.toAbsolutePath(), jp.toLongString()));
    }


}
