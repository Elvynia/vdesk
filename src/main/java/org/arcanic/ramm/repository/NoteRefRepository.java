package org.arcanic.ramm.repository;

import java.util.List;

import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRefRepository extends MongoRepository<NoteRef, Long> {

	List<Reference> findReferenceByNoteId(final String id);
}
