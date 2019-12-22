SELECT word, count(*)
FROM (
         SELECT regexp_split_to_table(lyrics, '\s') as word
         FROM songs
     ) t
WHERE word LIKE '%:search_term%'
GROUP BY word;