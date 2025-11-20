package com.skillswap.dto.request;

public class MessageCreateRequest {
    private Long receiverId;
    private Long exchangeId;
    private String content;

    public Long getReceiverId() { return receiverId; }
    public void setReceiverId(Long receiverId) { this.receiverId = receiverId; }
    public Long getExchangeId() { return exchangeId; }
    public void setExchangeId(Long exchangeId) { this.exchangeId = exchangeId; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
