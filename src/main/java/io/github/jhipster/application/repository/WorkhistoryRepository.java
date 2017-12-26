package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Workhistory;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Workhistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkhistoryRepository extends JpaRepository<Workhistory, Long> {

}
