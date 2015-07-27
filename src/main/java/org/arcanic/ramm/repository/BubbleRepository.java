package org.arcanic.ramm.repository;

import org.arcanic.ramm.document.Bubble;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BubbleRepository extends MongoRepository<Bubble, String> {

}
