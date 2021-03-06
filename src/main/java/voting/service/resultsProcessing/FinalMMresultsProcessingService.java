//package voting.service.resultsProcessing;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import voting.model.Party;
//import voting.service.DistrictService;
//import voting.service.PartyService;
//
//import java.math.BigDecimal;
//import java.util.*;
//import java.util.stream.Collectors;
//
///**
// * Created by andrius on 2/20/17.
// */
//
//@Service
//public class FinalMMresultsProcessingService {
//
//    private final DistrictResultsProcessingService DRPS;
//    private final DistrictService districtService;
//    private final PartyService partyService;
//
//    @Autowired
//    public FinalMMresultsProcessingService(DistrictResultsProcessingService DRPS,
//                                           DistrictService districtService,
//                                           PartyService partyService) {
//        this.DRPS = DRPS;
//        this.districtService = districtService;
//        this.partyService = partyService;
//    }
//
//    public Map<Party, Long> getAllPartiesWithVotes() {
//        Map<Party, Long> mappedParties = new HashMap<>();
//        List<Map<Party, Long>> listOfMaps = new ArrayList<>();
//
//        partyService.getParties().spliterator().forEachRemaining(p -> mappedParties.put(p, 0L));
//        districtService.getDistricts().forEach(d -> listOfMaps.add(DRPS.getPartiesWithVotes(d)));
//
//        listOfMaps.forEach(map -> {
//            map.forEach((k, v) -> mappedParties.put(k, (mappedParties.get(k) + v)));
//        });
//
//        return mappedParties;
//    }
//
//    public Map<Party, Double> getAllPartiesWithSharePercentage() {
//        Map<Party, Long> allPartiesWithVotes = getAllPartiesWithVotes();
//        Long grandTotalVotes = allPartiesWithVotes.entrySet().stream()
//                .mapToLong(Map.Entry::getValue)
//                .sum();
//
//        return allPartiesWithVotes.entrySet().stream()
//                .map(es -> new AbstractMap.SimpleEntry<Party, Double>(es.getKey(), es.getValue() / (double) grandTotalVotes))
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
//    }
//
//    // filter parties (with votes) that pass 5% of total MM votes
//    public Map<Party, Long> getPartiesWithVotes() {
//        List<Party> _5percentParties = getFilteredParties();
//        return getAllPartiesWithVotes().entrySet().stream()
//                .filter(es -> _5percentParties.contains(es.getKey()))
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
//    }
//
//    // filter parties (with percentage) that pass 5% of total MM votes
//    public Map<Party, Double> getPartiesWithSharePercentage() {
//        Map<Party, Long> filteredPartiesWithVotes = getPartiesWithVotes();
//        Long filteredGrandTotalVotes = filteredPartiesWithVotes.entrySet().stream()
//                .mapToLong(Map.Entry::getValue)
//                .sum();
//
//        return filteredPartiesWithVotes.entrySet().stream()
//                .map(es -> new AbstractMap.SimpleEntry<Party, Double>(es.getKey(), es.getValue() / (double) filteredGrandTotalVotes))
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
//    }
//
//    //TODO skaiciuoja apytikslius mandatus
//    // parties with approx (double value) won mandates
//    public Map<Party, Double> getPartiesWithWonMandates() {
//        Long blackHoles = 141L;
//        return getPartiesWithSharePercentage().entrySet().stream()
//                .map(es -> new AbstractMap.SimpleEntry<Party, Double>(es.getKey(), blackHoles / es.getValue()))
//                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
//    }
//
//    // filter parties to List that pass 5% of total MM votes
//    private List<Party> getFilteredParties() {
//        return getAllPartiesWithSharePercentage()
//                .entrySet()
//                .stream()
//                .filter(es -> {
//                    int compareVal = new BigDecimal(es.getValue()).compareTo(new BigDecimal(0.05));
//                    return compareVal == 0 || compareVal == 1;
//                })
//                .map(Map.Entry::getKey)
//                .collect(Collectors.toList());
//    }
//}