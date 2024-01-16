package com.example.flypatternlib.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Material {
        @Id
        private Integer id;
        private String name;

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
}
