package org.arcanic.ramm.repository;

import org.arcanic.ramm.document.Reference;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Definition of a Reference repository.
 *
 * @author jeremy.masson
 *
 */
@Repository
public interface ReferenceRepository extends MongoRepository<Reference, String> {

}
