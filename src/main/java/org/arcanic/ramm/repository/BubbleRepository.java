package org.arcanic.ramm.repository;

import org.arcanic.ramm.document.Bubble;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Definition of a Bubble repository.
 *
 * @author jeremy.masson
 *
 */
@Repository
public interface BubbleRepository extends MongoRepository<Bubble, Long> {

}
