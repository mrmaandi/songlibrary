package com.killjoy.theproject.controller;

import com.killjoy.theproject.model.FrequenciesResult;
import com.killjoy.theproject.model.Song;
import com.killjoy.theproject.repository.SongsRepository;
import com.killjoy.theproject.service.SongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class SongsController {
    @Autowired
    private SongsRepository repository;
    @Autowired
    private SongsService service;

    @GetMapping("/search")
    @CrossOrigin
    public List<FrequenciesResult> searchSongs(@RequestParam(required = false) String searchTerm) {
        return service.getWordsBySearchTerm(searchTerm.toLowerCase());
    }

    @GetMapping("/mostused")
    @CrossOrigin
    public List<FrequenciesResult> findMostUsedWords() {
        return service.findMostUsedWords();
    }

    @GetMapping("/songs")
    @CrossOrigin
    public List<Song> findAllSongs() {
        return repository.findAll();
    }

    @GetMapping("/songbyid")
    @CrossOrigin
    public Optional<Song> findSongById(@RequestParam String id) {
        return repository.findById(Long.valueOf(id));
    }

    @DeleteMapping("/deletesong")
    @CrossOrigin
    public void deleteSongById(@RequestParam String id) {
        repository.deleteById(Long.valueOf(id));
    }

    @GetMapping("/songsbyterm")
    @CrossOrigin
    public List<Song> findAllSongsContainingWord(@RequestParam(required = false) String searchTerm) {
        return service.findSongsByTerm(searchTerm.toLowerCase());
    }

    @PostMapping("/addsong")
    @CrossOrigin
    public void addSong(@RequestParam String title,
                        @RequestBody String lyrics) {
        Song song = new Song();
        song.setLyrics(lyrics);
        song.setTitle(title);
        repository.saveAndFlush(song);
    }
}
