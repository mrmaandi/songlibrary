package com.killjoy.theproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "songs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Song implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "title", columnDefinition = "varchar(1000)")
    private String title;
    @Column(name = "lyrics", columnDefinition = "varchar(2500)")
    private String lyrics;
}
