package com.vlad.springbootlibrary.controller;

import com.vlad.springbootlibrary.entity.Message;
import com.vlad.springbootlibrary.service.MessageService;
import com.vlad.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody Message message) {
        String userEmail = ExtractJWT.payloadJwtExtraction(token, "\"sub\"");
        messageService.postMessage(message, userEmail);
    }
}
