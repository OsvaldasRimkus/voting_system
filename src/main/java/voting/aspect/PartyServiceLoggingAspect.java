package voting.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import voting.dto.PartyRepresentation;
import voting.service.PartyService;
import voting.utils.Extractor;

import java.util.Arrays;

/**
 * Created by andrius on 2/27/17.
 */

@Aspect
@Component
public class PartyServiceLoggingAspect {

    private final PartyService partyService;
    private final Logger logger = Logger.getLogger(PartyServiceLoggingAspect.class);

    @Autowired
    public PartyServiceLoggingAspect(PartyService partyService) {
        this.partyService = partyService;
    }

    @Pointcut("execution(* voting.controller.PartyController.getParties())")
    void getParties() { }

    @After("getParties()")
    public void afterGetAllParties(JoinPoint jp) {
        logger.debug("All parties extracted : " + jp.toLongString());
    }

    @Pointcut("execution(* voting.controller.PartyController.getParty(..)) && args(id)")
    void getParty(Long id) { }

    @After(value = "getParty(id)", argNames = "jp,id")
    public void afterGetPartyById(JoinPoint jp, Long id) {
        logger.debug(String.format("Political party extracted [id: %d] : %s", id, jp.toLongString()));
    }

    @Pointcut("execution(* voting.controller.PartyController.saveParty(..))")
    void saveParty() { }

    @AfterReturning(pointcut = "saveParty()", returning = "returnValue")
    public void afterSavePartyWithCandidates(JoinPoint jp, PartyRepresentation returnValue) {
//        String[] ids = Extractor.extractIdsFromCandidates(returnValue.getCandidates());
//        logger.debug(String.format(
//                "Political party created [id: %d] with candidates [ids: %s] : %s",
//                returnValue.getId(), Arrays.toString(ids), jp.toLongString())
//        );
    }

    @Pointcut("execution(* voting.controller.PartyController.deleteParty(..)) && args(id)")
    void deleteParty(Long id) { }

    @After(value = "deleteParty(id)", argNames = "jp,id")
    public void afterDeleteParty(JoinPoint jp, Long id) {
//        String[] ids = Extractor.extractIdsFromOrphanCandidates(partyService.getParty(id));
//        logger.debug(String.format(
//                "Political party deleted [id: %d] with candidates (districtless) [ids: %s] : %s",
//                id, Arrays.toString(ids), jp.toLongString())
//        );
    }

    @Pointcut("execution(* voting.controller.PartyController.deleteCandidateList(..)) && args(id)")
    void deleteCandidateList(Long id) { }

    @AfterReturning(value = "deleteCandidateList(id)", argNames = "jp,id")
    public void afterDeletingPartyCandidateList(JoinPoint jp, Long id) {
//        String[] ids = Extractor.extractIdsFromOrphanCandidates(partyService.getParty(id));
//        logger.debug(String.format(
//                "Party [id: %d] candidates (districtless) [ids: %s] deleted : %s",
//                id, Arrays.toString(ids), jp.toLongString())
//        );
    }
}
