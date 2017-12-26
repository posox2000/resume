package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Workhistory;

import io.github.jhipster.application.repository.WorkhistoryRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Workhistory.
 */
@RestController
@RequestMapping("/api")
public class WorkhistoryResource {

    private final Logger log = LoggerFactory.getLogger(WorkhistoryResource.class);

    private static final String ENTITY_NAME = "workhistory";

    private final WorkhistoryRepository workhistoryRepository;

    public WorkhistoryResource(WorkhistoryRepository workhistoryRepository) {
        this.workhistoryRepository = workhistoryRepository;
    }

    /**
     * POST  /workhistories : Create a new workhistory.
     *
     * @param workhistory the workhistory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new workhistory, or with status 400 (Bad Request) if the workhistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/workhistories")
    @Timed
    public ResponseEntity<Workhistory> createWorkhistory(@RequestBody Workhistory workhistory) throws URISyntaxException {
        log.debug("REST request to save Workhistory : {}", workhistory);
        if (workhistory.getId() != null) {
            throw new BadRequestAlertException("A new workhistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Workhistory result = workhistoryRepository.save(workhistory);
        return ResponseEntity.created(new URI("/api/workhistories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /workhistories : Updates an existing workhistory.
     *
     * @param workhistory the workhistory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated workhistory,
     * or with status 400 (Bad Request) if the workhistory is not valid,
     * or with status 500 (Internal Server Error) if the workhistory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/workhistories")
    @Timed
    public ResponseEntity<Workhistory> updateWorkhistory(@RequestBody Workhistory workhistory) throws URISyntaxException {
        log.debug("REST request to update Workhistory : {}", workhistory);
        if (workhistory.getId() == null) {
            return createWorkhistory(workhistory);
        }
        Workhistory result = workhistoryRepository.save(workhistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, workhistory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /workhistories : get all the workhistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of workhistories in body
     */
    @GetMapping("/workhistories")
    @Timed
    public List<Workhistory> getAllWorkhistories() {
        log.debug("REST request to get all Workhistories");
        return workhistoryRepository.findAll();
        }

    /**
     * GET  /workhistories/:id : get the "id" workhistory.
     *
     * @param id the id of the workhistory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the workhistory, or with status 404 (Not Found)
     */
    @GetMapping("/workhistories/{id}")
    @Timed
    public ResponseEntity<Workhistory> getWorkhistory(@PathVariable Long id) {
        log.debug("REST request to get Workhistory : {}", id);
        Workhistory workhistory = workhistoryRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(workhistory));
    }

    /**
     * DELETE  /workhistories/:id : delete the "id" workhistory.
     *
     * @param id the id of the workhistory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/workhistories/{id}")
    @Timed
    public ResponseEntity<Void> deleteWorkhistory(@PathVariable Long id) {
        log.debug("REST request to delete Workhistory : {}", id);
        workhistoryRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
