package org.arcanic.ramm.memory;

/**
 * Definition of a memory for memory map.
 *
 * @author Arcanis
 *
 * @param <T> the object type holding memory data.
 */
public interface Memory<T> {

	/**
	 * Retrieve the object holding memory data.
	 *
	 * @return {@link T} the object represented by this memory.
	 */
	T getMemory();
}
