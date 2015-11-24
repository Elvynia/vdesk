package org.arcanic.ramm.repository;

import java.util.List;

import org.arcanic.ramm.document.Note;
import org.arcanic.ramm.document.NoteRef;
import org.arcanic.ramm.document.Reference;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRefRepository extends MongoRepository<NoteRef, String> {

	List<NoteRef> countByReferenceIdAndNoteIdIn(final String referenceId, final List<String> noteIds);

	List<NoteRef> findByNote(final Note note);

	List<NoteRef> findByReference(final Reference reference);

	@Query(value = "{'note.id' : ?0,'reference.id' : {$ne: ?1}}", fields = "{'reference': 1}")
	List<NoteRef> findReferencesByNote(final String noteId, final String referenceId);
}
