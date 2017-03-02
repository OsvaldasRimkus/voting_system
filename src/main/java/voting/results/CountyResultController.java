package voting.results;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import voting.dto.results.CountyMMResultRepresentation;
import voting.dto.results.CountyResultDTO;
import voting.dto.results.CountySMResultRepresentation;
import voting.exception.MultiErrorException;
import voting.results.model.result.CountyMMResult;
import voting.results.model.result.CountySMResult;

import javax.validation.Valid;

/**
 * Created by andrius on 1/24/17.
 */

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/results")
public class CountyResultController {

    private ResultService resultService;

    @Autowired
    public CountyResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping(path = "county/{id}/single-mandate")
    public CountySMResultRepresentation getCountySingleMandateResult(@PathVariable("id") Long countyId) {
        CountySMResult result = resultService.getCountySMResult(countyId);
        if (result == null) {
            return null;
        }
        return new CountySMResultRepresentation(result);
    }

    @GetMapping(path = "county/{id}/multi-mandate")
    public CountyMMResultRepresentation getCountyMultiMandateResult(@PathVariable("id") Long countyId) {
        CountyMMResult result = resultService.getCountyMMResult(countyId);
        if (result == null) {
            return null;
        }
        return new CountyMMResultRepresentation(result);
    }

    @PostMapping(path = "county/single-mandate")
    public CountySMResultRepresentation addCountySMResult(@Valid @RequestBody CountyResultDTO resultDTO, BindingResult result) {
        if (result.hasErrors()) {
            throw new MultiErrorException("Klaida apylinkės rezultatuose!", result.getAllErrors());
        }
        return new CountySMResultRepresentation(resultService.addCountySMResult(resultDTO));

    }

    @PostMapping(path = "county/multi-mandate")
    public CountyMMResultRepresentation addCountyMMResult(@Valid @RequestBody CountyResultDTO resultDTO, BindingResult result) {
        if (result.hasErrors()) {
            throw new MultiErrorException("Klaida apylinkės rezultatuose!", result.getAllErrors());
        }
        return new CountyMMResultRepresentation(resultService.addCountyMMResult(resultDTO));
    }

    @PostMapping(path = "confirm")
    public void confirmCountyResult(@RequestParam Long resultId) {
        resultService.confirmCountyResult(resultId);
    }

    @DeleteMapping(path = "{id}")
    public void deleteCountyResult(@PathVariable(name = "id") Long resultId) {
        resultService.deleteCountyResult(resultId);
    }

}