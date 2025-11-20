package com.skillswap.service;

import com.skillswap.dto.request.MessageCreateRequest;
import com.skillswap.model.Message;
import com.skillswap.model.SkillExchange;
import com.skillswap.repository.MessageRepository;
import com.skillswap.repository.SkillExchangeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final SkillExchangeRepository exchangeRepository;

    public MessageService(MessageRepository messageRepository, SkillExchangeRepository exchangeRepository) {
        this.messageRepository = messageRepository;
        this.exchangeRepository = exchangeRepository;
    }

    public Message sendMessage(Long senderId, MessageCreateRequest req) {
        Message m = new Message();
        m.setSenderId(senderId);
        m.setReceiverId(req.getReceiverId());
        if (req.getExchangeId() != null) {
            Optional<SkillExchange> e = exchangeRepository.findById(req.getExchangeId());
            e.ifPresent(m::setExchange);
        }
        m.setContent(req.getContent());
        return messageRepository.save(m);
    }

    public List<Message> getMessagesByExchange(Long exchangeId) {
        return messageRepository.findByExchangeIdOrderBySentAt(exchangeId);
    }

    public List<Message> getMessagesForUser(Long userId) {
        return messageRepository.findBySenderIdOrReceiverIdOrderBySentAt(userId, userId);
    }
}
