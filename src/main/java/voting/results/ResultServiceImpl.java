package voting.results;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import voting.dto.results.CountyResultDTO;
import voting.dto.results.VoteDTO;
import voting.exception.NotFoundException;
import voting.model.Candidate;
import voting.model.County;
import voting.model.Party;
import voting.results.model.result.*;
import voting.results.model.votecount.CandidateVote;
import voting.results.model.votecount.PartyVote;
import voting.results.repository.*;
import voting.service.CandidateService;
import voting.service.DistrictService;
import voting.service.PartyService;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by domas on 2/23/17.
 */
@Service
public class ResultServiceImpl implements ResultService {

    private final DistrictService districtService;
    private final PartyService partyService;
    private final CandidateService candidateService;
    private final ResultRepository resultRepository;
    private final CountySMResultRepository countySMrepo;
    private final CountyMMResultRepository countyMMrepo;
    private final DistrictSMResultRepository districtSMrepo;
    private final DistrictMMResultRepository districtMMrepo;


    @Autowired
    public ResultServiceImpl(DistrictService districtService,
                             PartyService partyService,
                             CandidateService candidateService,
                             ResultRepository resultRepository,
                             CountySMResultRepository countySMrepo,
                             CountyMMResultRepository countyMMrepo,
                             DistrictSMResultRepository districtSMrepo,
                             DistrictMMResultRepository districtMMrepo) {
        this.districtService = districtService;
        this.partyService = partyService;
        this.candidateService = candidateService;
        this.resultRepository = resultRepository;
        this.countySMrepo = countySMrepo;
        this.countyMMrepo = countyMMrepo;
        this.districtSMrepo = districtSMrepo;
        this.districtMMrepo = districtMMrepo;
    }


    @Override
    public CountySMResult addCountySMResult(CountyResultDTO resultDTO) {
        County county = districtService.getCounty(resultDTO.getCountyId());
        if (countySMrepo.existsByCounty(county)) {
            throw new IllegalArgumentException(String.format("Apylinkės \"%s\" rezultatas jau užregistruotas", county));
        }
        CountySMResult result = convertToCountySMResult(resultDTO);
        return resultRepository.save(result);
    }

    @Override
    public CountyMMResult addCountyMMResult(CountyResultDTO resultDTO) {
        County county = districtService.getCounty(resultDTO.getCountyId());
        if (countyMMrepo.existsByCounty(county)) {
            throw new IllegalArgumentException(String.format("Apylinkės \"%s\" rezultatas jau užregistruotas", county));
        }
        CountyMMResult result = convertToCountyMMResult(resultDTO);
        return resultRepository.save(result);
    }


    @Override
    public CountySMResult getCountySMResult(Long countyId) {
        County county = districtService.getCounty(countyId);
        CountySMResult result = countySMrepo.findOneByCounty(county);
        return result;
    }

    @Override
    public CountyMMResult getCountyMMResult(Long countyId) {
        County county = districtService.getCounty(countyId);
        CountyMMResult result = countyMMrepo.findOneByCounty(county);
        return result;
    }

    @Transactional
    @Override
    public void confirmCountyResult(Long id) {
        Result result = getResult(id);
        if (!isCountyResult(result)) {
            throw new RuntimeException("cannot confirm district result");
        }
        CountyResult cr = (CountyResult) result;
        cr.setConfirmed(true);
        resultRepository.save(cr);
        // TODO: finish
        // TODO: update district result on confirm
        // updateDistrictResult(cr.getCounty().getDistrict());
    }

    @Transactional
    @Override
    public void deleteCountyResult(Long id) {
        Result result = getResult(id);
        if (!isCountyResult(result)) {
            throw new RuntimeException("cannot confirm district result");
        }

        CountyResult cr = (CountyResult) result;
        County county = cr.getCounty();

        //TODO: temp hack
        if (result instanceof CountySMResult) {
            county.setSmResult(null);
        } else {
            county.setMmResult(null);
        }
        resultRepository.delete(id);


        // TODO: update district result on confirm

    }



    private Result getResult(Long id) {
        Result result = resultRepository.findOne(id);
        if (result == null) {
            throw new NotFoundException("Nepavyko rasti rezultato su id " + id);
        }
        return result;
    }

    private boolean isCountyResult(Result result) {
        return result instanceof CountyResult;
    }

    private boolean isDistrictResut(Result result) {
        return result instanceof DistrictResult;
    }


    private CountySMResult convertToCountySMResult(CountyResultDTO resultDTO) {
        CountySMResult result = new CountySMResult();
        County county = districtService.getCounty(resultDTO.getCountyId());
        result.setCounty(county);

        List<CandidateVote> voteList = resultDTO.getVoteList()
                                                .stream()
                                                .map(v -> convertToCandidateVote(v))
                                                .collect(Collectors.toList());
        voteList.stream().forEach(result::addVote);

        result.setConfirmed(false);
        result.setSpoiledBallots(resultDTO.getSpoiledBallots());
        return result;
    }

    private CountyMMResult convertToCountyMMResult(CountyResultDTO resultDTO) {
        CountyMMResult result = new CountyMMResult();
        County county = districtService.getCounty(resultDTO.getCountyId());
        result.setCounty(county);

        List<PartyVote> voteList = resultDTO.getVoteList()
                .stream()
                .map(v -> convertToPartyVote(v))
                .collect(Collectors.toList());
        voteList.stream().forEach(result::addVote);

        result.setConfirmed(false);
        result.setSpoiledBallots(resultDTO.getSpoiledBallots());
        return result;
    }


    private CandidateVote convertToCandidateVote(VoteDTO voteDTO) {
        Candidate candidate = candidateService.getCandidate(voteDTO.getUnitId());
        CandidateVote vote = new CandidateVote(candidate, voteDTO.getVotes());
        return vote;
    }

    private PartyVote convertToPartyVote(VoteDTO voteDTO) {
        Party party = partyService.getParty(voteDTO.getUnitId());
        PartyVote vote = new PartyVote(party, voteDTO.getVotes());
        return vote;
    }


}