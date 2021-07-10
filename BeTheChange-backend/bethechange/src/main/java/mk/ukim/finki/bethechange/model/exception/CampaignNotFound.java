package mk.ukim.finki.bethechange.model.exception;

public class CampaignNotFound extends RuntimeException {
    public CampaignNotFound(Long id) {
        super(String.format("The campaign with the provided id (%d) does not exist!", id));
    }
}
