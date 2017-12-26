package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.ResumeApp;

import io.github.jhipster.application.domain.Workhistory;
import io.github.jhipster.application.repository.WorkhistoryRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WorkhistoryResource REST controller.
 *
 * @see WorkhistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ResumeApp.class)
public class WorkhistoryResourceIntTest {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_JOB_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_JOB_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private WorkhistoryRepository workhistoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWorkhistoryMockMvc;

    private Workhistory workhistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WorkhistoryResource workhistoryResource = new WorkhistoryResource(workhistoryRepository);
        this.restWorkhistoryMockMvc = MockMvcBuilders.standaloneSetup(workhistoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Workhistory createEntity(EntityManager em) {
        Workhistory workhistory = new Workhistory()
            .companyName(DEFAULT_COMPANY_NAME)
            .location(DEFAULT_LOCATION)
            .position(DEFAULT_POSITION)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .jobDescription(DEFAULT_JOB_DESCRIPTION);
        return workhistory;
    }

    @Before
    public void initTest() {
        workhistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createWorkhistory() throws Exception {
        int databaseSizeBeforeCreate = workhistoryRepository.findAll().size();

        // Create the Workhistory
        restWorkhistoryMockMvc.perform(post("/api/workhistories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workhistory)))
            .andExpect(status().isCreated());

        // Validate the Workhistory in the database
        List<Workhistory> workhistoryList = workhistoryRepository.findAll();
        assertThat(workhistoryList).hasSize(databaseSizeBeforeCreate + 1);
        Workhistory testWorkhistory = workhistoryList.get(workhistoryList.size() - 1);
        assertThat(testWorkhistory.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testWorkhistory.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testWorkhistory.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testWorkhistory.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testWorkhistory.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testWorkhistory.getJobDescription()).isEqualTo(DEFAULT_JOB_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createWorkhistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = workhistoryRepository.findAll().size();

        // Create the Workhistory with an existing ID
        workhistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkhistoryMockMvc.perform(post("/api/workhistories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workhistory)))
            .andExpect(status().isBadRequest());

        // Validate the Workhistory in the database
        List<Workhistory> workhistoryList = workhistoryRepository.findAll();
        assertThat(workhistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWorkhistories() throws Exception {
        // Initialize the database
        workhistoryRepository.saveAndFlush(workhistory);

        // Get all the workhistoryList
        restWorkhistoryMockMvc.perform(get("/api/workhistories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workhistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].jobDescription").value(hasItem(DEFAULT_JOB_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getWorkhistory() throws Exception {
        // Initialize the database
        workhistoryRepository.saveAndFlush(workhistory);

        // Get the workhistory
        restWorkhistoryMockMvc.perform(get("/api/workhistories/{id}", workhistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(workhistory.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.jobDescription").value(DEFAULT_JOB_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWorkhistory() throws Exception {
        // Get the workhistory
        restWorkhistoryMockMvc.perform(get("/api/workhistories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWorkhistory() throws Exception {
        // Initialize the database
        workhistoryRepository.saveAndFlush(workhistory);
        int databaseSizeBeforeUpdate = workhistoryRepository.findAll().size();

        // Update the workhistory
        Workhistory updatedWorkhistory = workhistoryRepository.findOne(workhistory.getId());
        // Disconnect from session so that the updates on updatedWorkhistory are not directly saved in db
        em.detach(updatedWorkhistory);
        updatedWorkhistory
            .companyName(UPDATED_COMPANY_NAME)
            .location(UPDATED_LOCATION)
            .position(UPDATED_POSITION)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .jobDescription(UPDATED_JOB_DESCRIPTION);

        restWorkhistoryMockMvc.perform(put("/api/workhistories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWorkhistory)))
            .andExpect(status().isOk());

        // Validate the Workhistory in the database
        List<Workhistory> workhistoryList = workhistoryRepository.findAll();
        assertThat(workhistoryList).hasSize(databaseSizeBeforeUpdate);
        Workhistory testWorkhistory = workhistoryList.get(workhistoryList.size() - 1);
        assertThat(testWorkhistory.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testWorkhistory.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testWorkhistory.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testWorkhistory.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testWorkhistory.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testWorkhistory.getJobDescription()).isEqualTo(UPDATED_JOB_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingWorkhistory() throws Exception {
        int databaseSizeBeforeUpdate = workhistoryRepository.findAll().size();

        // Create the Workhistory

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWorkhistoryMockMvc.perform(put("/api/workhistories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(workhistory)))
            .andExpect(status().isCreated());

        // Validate the Workhistory in the database
        List<Workhistory> workhistoryList = workhistoryRepository.findAll();
        assertThat(workhistoryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWorkhistory() throws Exception {
        // Initialize the database
        workhistoryRepository.saveAndFlush(workhistory);
        int databaseSizeBeforeDelete = workhistoryRepository.findAll().size();

        // Get the workhistory
        restWorkhistoryMockMvc.perform(delete("/api/workhistories/{id}", workhistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Workhistory> workhistoryList = workhistoryRepository.findAll();
        assertThat(workhistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Workhistory.class);
        Workhistory workhistory1 = new Workhistory();
        workhistory1.setId(1L);
        Workhistory workhistory2 = new Workhistory();
        workhistory2.setId(workhistory1.getId());
        assertThat(workhistory1).isEqualTo(workhistory2);
        workhistory2.setId(2L);
        assertThat(workhistory1).isNotEqualTo(workhistory2);
        workhistory1.setId(null);
        assertThat(workhistory1).isNotEqualTo(workhistory2);
    }
}
