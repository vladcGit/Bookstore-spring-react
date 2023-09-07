package com.vlad.springbootlibrary.service;

import com.vlad.springbootlibrary.dao.MessageRepository;
import com.vlad.springbootlibrary.entity.Message;
import com.vlad.springbootlibrary.requestmodels.AdminQuestionRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception{
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if(message.isEmpty()) throw new Exception("Message not found");

        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }


}
