package voting.service;

import com.opencsv.CSVReader;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.HeaderColumnNameTranslateMappingStrategy;
import com.opencsv.exceptions.CsvConstraintViolationException;
import com.opencsv.exceptions.CsvException;
import org.springframework.stereotype.Service;
import voting.dto.CandidateData;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

/**
 * Created by domas on 1/21/17.
 */
@Service
public class ParsingServiceImpl implements ParsingService {


    public List<CandidateData> parseCandidateList(CandidateParsingStrategy strategy, File file) throws CsvException, IOException {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        String[] correctHeader = strategy.getHeader();
        int columnCount = correctHeader.length;
        List<CandidateData> candidateDataList = new ArrayList<>();


        try (CSVReader reader = new CSVReader(new FileReader(file))) {
            String[] header = reader.readNext();

            if (header.length != columnCount
                    || !Arrays.equals(header, correctHeader)) {
                throw (new CsvException("Incorrect or no header!"));
            }

            String[] line;
            int lineNumber = 2; // line 1 was header

            while ((line = reader.readNext()) != null) {
                if (line.length != columnCount) {
                    throw (new CsvException("Invalid data at line " + lineNumber));
                }

                //TODO: add proper validation / exception handling

                try {
                    CandidateData candidateData = strategy.createCandidateData(line);
                    candidateDataList.add(candidateData);
                    Set<ConstraintViolation<CandidateData>> violations = validator.validate(candidateData);
                    if (violations.size() > 0) {
                        throw (new CsvConstraintViolationException("Constaint violation at line " + lineNumber));
                    }
                    lineNumber++;
                } catch (NumberFormatException ex) {
                    throw (new CsvException("Invalid data at line " + lineNumber));
                }
            }
        } catch (IOException e) {
            throw (new IOException("error reading file"));
        }

        return candidateDataList;
    }


    @Override
    public List<CandidateData> parseSingleMandateCandidateList(File file) throws IOException, CsvException {
        CandidateParsingStrategy strategy = new SingleMandateCandidateParsingStrategy();
        return parseCandidateList(strategy, file);
    }

    @Override
    public List<CandidateData> parseMultiMandateCandidateList(File file) throws IOException, CsvException {
        CandidateParsingStrategy strategy = new MultiMandateCandidateParsingStrategy();
        return parseCandidateList(strategy, file);
    }


    private abstract class CandidateParsingStrategy {
        private String[] header;

        abstract CandidateData createCandidateData(String[] line);

        String[] getHeader() {
            return header;
        }
    }


    private class SingleMandateCandidateParsingStrategy extends CandidateParsingStrategy {

        private String[] header = "Vardas,Pavardė,Asmens_kodas,Partija".split(",");

        @Override
        public CandidateData createCandidateData(String[] line) {
            CandidateData candidateData = new CandidateData();
            candidateData.setFirstName(line[0]);
            candidateData.setLastName(line[1]);
            candidateData.setPersonId(line[2]);
            candidateData.setPartyName(line[3]);
            return candidateData;
        }
    }

    private class MultiMandateCandidateParsingStrategy extends CandidateParsingStrategy {
        private String[] header = "Numeris,Vardas,Pavardė,Asmens_kodas".split(",");

        @Override
        public CandidateData createCandidateData(String[] line) {
            CandidateData candidateData = new CandidateData();
            candidateData.setPositionInPartyList(Long.parseLong(line[0]));
            candidateData.setFirstName(line[1]);
            candidateData.setLastName(line[2]);
            candidateData.setPersonId(line[3]);
            return candidateData;
        }
    }
}