package com.skillswap.dto.request;

public class MatchCreateRequest {
    private Long offeringId;
    private Long requestId;

    public Long getOfferingId() { return offeringId; }
    public void setOfferingId(Long offeringId) { this.offeringId = offeringId; }
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
}
