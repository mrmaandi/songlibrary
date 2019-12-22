package com.killjoy.theproject.service;

import com.killjoy.theproject.model.FrequenciesResult;
import com.killjoy.theproject.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SongsService {
    @Value("classpath:sql/sql_search_by_term.sql")
    Resource sql_search_by_term;

    @Autowired
    JdbcTemplate jdbcTemplate;

    public FrequenciesResult getWordsBySearchTerm(String searchTerm) {
        String sql = "SELECT MIN(word), count(*) FROM (SELECT regexp_split_to_table(lyrics, '\\s') as word FROM songs) t WHERE lower(word) LIKE ? GROUP BY lower(word);";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{"%" + searchTerm + "%"}, new BeanPropertyRowMapper<>(FrequenciesResult.class));
        } catch (EmptyResultDataAccessException error) {
            FrequenciesResult result = new FrequenciesResult();
            result.setWord(searchTerm);
            result.setCount(0);
            return result;
        }
    }

    public List<FrequenciesResult> findMostUsedWords() {
        String sql = "SELECT word, count(*) FROM (SELECT regexp_split_to_table(lyrics, '\\s') as word FROM songs) t GROUP BY word ORDER BY COUNT(*) DESC;";
        try {
            return jdbcTemplate.query(
                    sql,
                    (rs, rowNum) -> new FrequenciesResult(
                            rs.getString("word"),
                            rs.getInt("count")
                    ));
        } catch (EmptyResultDataAccessException error) {
            return new ArrayList<>();
        }
    }

    public List<Song> findSongsByTerm(String searchTerm) {
        String sql = "SELECT * FROM songs WHERE lower(lyrics) LIKE ?;";
        try {
            return jdbcTemplate.query(
                    sql,
                    new Object[]{"%" + searchTerm + "%"},
                    (rs, rowNum) -> new Song(
                            rs.getInt("id"),
                            rs.getString("title"),
                            rs.getString("lyrics")
                    ));
        } catch (EmptyResultDataAccessException error) {
            return new ArrayList<>();
        }
    }
}
