package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.sql.In;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table
public class Pattern {
    @Id
    private Integer id;
    private String name;
    private String descr;
    private String instr;
    private Integer hook_size;
    private String type;
    private String img_url;
    private Boolean for_sale;
    private Integer price;
    private LocalDateTime created;
    private Set<PatternMaterial> materials = new HashSet<>(); //materials in pattern
    private Set<PatternSpecies> species = new HashSet<>();
    //Set<PatternSpecies> species = new HashSet<>(); //species pattern is tied for

    public void addMaterial(Material material) {
        this.materials.add(new PatternMaterial(material.getId()));
    }

    public void addSpecies(Species species) {
        this.species.add(new PatternSpecies(species.getId()));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getInstr() {
        return instr;
    }

    public void setInstr(String instr) {
        this.instr = instr;
    }

    public Integer getHook_size() {
        return hook_size;
    }

    public void setHook_size(Integer hook_size) {
        this.hook_size = hook_size;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public Boolean getFor_sale() {
        return for_sale;
    }

    public void setFor_sale(Boolean for_sale) {
        this.for_sale = for_sale;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public Set<PatternMaterial> getMaterials() {
        return materials;
    }

    public void setMaterials(Set<PatternMaterial> materials) {
        this.materials = materials;
    }

    public Set<PatternSpecies> getSpecies() {
        return species;
    }

    public void setSpecies(Set<PatternSpecies> species) {
        this.species = species;
    }
}
