package com.killjoy.theproject.repository;

import com.killjoy.theproject.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongsRepository extends JpaRepository<Song, Long> {
    List<Song> findAll();
}
