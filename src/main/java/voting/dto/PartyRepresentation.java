package voting.dto;

import voting.model.Party;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Created by domas on 1/12/17.
 */
public class PartyRepresentation {

    private Long id;
    private String name;
    private List<CandidateRepresentation> candidates;


    public PartyRepresentation() {
    }

    public PartyRepresentation(Party party) {
        this.id = party.getId();
        this.name = party.getName();
        this.candidates = new ArrayList<>();
        if (party.getCandidates() != null) {
            party.getCandidates().forEach(c -> candidates.add(new CandidateRepresentation(c)));
        }
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CandidateRepresentation> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<CandidateRepresentation> candidates) {
        this.candidates = candidates;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyRepresentation that = (PartyRepresentation) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(candidates, that.candidates);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, candidates);
    }

    @Override
    public String toString() {
        return "PartyRepresentation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", candidates=" + candidates +
                '}';
    }
}
