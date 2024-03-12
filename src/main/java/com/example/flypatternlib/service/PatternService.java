package com.example.flypatternlib.service;

import com.example.flypatternlib.DTO.FlyTypeDTO;
import com.example.flypatternlib.model.Pattern;
import com.example.flypatternlib.repository.PatternRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PatternService {

    final PatternRepository repository;

    public PatternService(PatternRepository repository) {
        this.repository = repository;
    }

    public List<Pattern> findByType(String type) {
        return repository.findByType(type);
    }

    public List<FlyTypeDTO> findAllTypes(){

        List<FlyTypeDTO> listOfTypes = new ArrayList<FlyTypeDTO>();

        //Find all types in
        List<String> listOfTypeStrings = repository.findAllTypes();
        //Clean list of duplicates
        List<String> allTypeStringsNoDuplicates =  listOfTypeStrings.stream().distinct().toList();

        //Loop through List of fly type strings and create object for each string
        for(int i = 0; i < allTypeStringsNoDuplicates.size(); i++) {
            FlyTypeDTO flyTypeDTO  = new FlyTypeDTO(i, allTypeStringsNoDuplicates.get(i));
            listOfTypes.add(flyTypeDTO);
        }
        //return list of FlyTypeDTOs
        return listOfTypes;
    }

}
