package org.arcanic.ramm.repository;

import org.arcanic.ramm.document.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Definition of a Bubble repository.
 *
 * @author jeremy.masson
 *
 */
@Repository
public interface NoteRepository extends MongoRepository<Note, String> {

}
