import React, { useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { PROJECTS, getFeaturedProject } from '@site/src/data/projects';
import type { Project } from '@site/src/data/projects';
import styles from './index.module.css';

const FILTERS = ['All', 'Mobile', 'Web', 'Research', 'Minecraft'] as const;

function projectStatus(status: Project['status']) {
    return status === 'Alpha' ? 'In development' : status;
}

function ProjectArtwork({ project }: { project: Project }) {
    return (
        <div className={styles.artwork}>
            <img src={project.image} alt="" loading="lazy" />
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const content = (
        <>
            <ProjectArtwork project={project} />
            <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                    {project.category && <span className={styles.category}>{project.category}</span>}
                    <span className={styles.status}>{projectStatus(project.status)}</span>
                    {project.price && <span className={styles.price}>{project.price}</span>}
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                {project.tags.length > 0 && (
                    <ul className={styles.tags} aria-label={`${project.title} technologies`}>
                        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                )}
                {project.link && <span className={styles.cardAction}>Explore project <span aria-hidden="true">↗</span></span>}
            </div>
        </>
    );

    return project.link ? (
        <Link className={`${styles.card} ${styles.cardLink}`} to={project.link}>
            {content}
        </Link>
    ) : (
        <article className={styles.card}>{content}</article>
    );
}

function FeaturedProject({ project }: { project: Project }) {
    return (
        <section className={styles.featured} aria-labelledby="featured-title">
            <div className={styles.featuredCopy}>
                <p className={styles.eyebrow}>In focus</p>
                <div className={styles.featuredMeta}>
                    {project.category && <span className={styles.category}>{project.category}</span>}
                    <span className={styles.status}>{projectStatus(project.status)}</span>
                </div>
                <h2 id="featured-title">{project.title}<span className={styles.italic}> for the whole you.</span></h2>
                <p className={styles.featuredDescription}>{project.description}</p>
                <Link className={styles.primaryAction} to="/gyrolog">Discover Gyrolog <span aria-hidden="true">↗</span></Link>
            </div>
            <div className={styles.featuredArtwork}>
                <img src={project.image} alt="" />
                <span className={styles.featuredWordmark}>GYROLOG</span>
            </div>
        </section>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const featuredProject = getFeaturedProject();
    const showFeatured = activeFilter === 'All' && searchQuery.trim() === '' && featuredProject;

    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        return PROJECTS.filter((project) => {
            const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
            const searchableText = [project.title, project.description, project.category ?? '', ...project.tags].join(' ').toLowerCase();
            return matchesFilter && (!query || searchableText.includes(query));
        }).filter((project) => !showFeatured || project !== featuredProject);
    }, [activeFilter, searchQuery, showFeatured, featuredProject]);

    const resetFilters = () => {
        setActiveFilter('All');
        setSearchQuery('');
    };

    return (
        <Layout title="Projects" description="Independent products and experiments from Kukso Studios.">
            <main className={styles.page}>
                <div className={styles.container}>
                    <header className={styles.hero}>
                        <p className={styles.eyebrow}>Kukso Studios <span aria-hidden="true">/</span> Our work</p>
                        <h1>Thoughtful tools for <span className={styles.italic}>everyday life.</span></h1>
                        <p className={styles.intro}>We build independent products that help people make sense of their days, their work, and the worlds they care about.</p>
                    </header>

                    {showFeatured && <FeaturedProject project={featuredProject} />}

                    <section className={styles.catalog} aria-labelledby="catalog-title">
                        <div className={styles.catalogHeader}>
                            <div>
                                <p className={styles.eyebrow}>Made with care</p>
                                <h2 id="catalog-title">Our projects</h2>
                            </div>
                            <label className={styles.search}>
                                <span className={styles.srOnly}>Search projects</span>
                                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                                    <circle cx="8.7" cy="8.7" r="5.7" />
                                    <path d="m13 13 4 4" />
                                </svg>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Search projects"
                                />
                            </label>
                        </div>

                        <div className={styles.controls}>
                            <div className={styles.filters} aria-label="Filter projects by category">
                                {FILTERS.map((filter) => (
                                    <button
                                        key={filter}
                                        type="button"
                                        className={activeFilter === filter ? styles.activeFilter : styles.filter}
                                        aria-pressed={activeFilter === filter}
                                        onClick={() => setActiveFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                            <p className={styles.resultCount} aria-live="polite">
                                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                            </p>
                        </div>

                        {filteredProjects.length > 0 ? (
                            <div className={styles.grid}>
                                {filteredProjects.map((project) => <ProjectCard key={project.title} project={project} />)}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <h3>No projects found</h3>
                                <p>Try another search or clear the category filter to see all of Kukso Studios’ work.</p>
                                <button type="button" className={styles.resetButton} onClick={resetFilters}>Show all projects</button>
                            </div>
                        )}
                    </section>

                    <aside className={styles.legacyNote}>
                        <p className={styles.eyebrow}>Where we began</p>
                        <h2>Built for the worlds people make.</h2>
                        <p>Our Minecraft projects remain part of the studio’s story: practical tools made for the communities that bring virtual worlds to life.</p>
                        <Link to="/docs/category/cublexcore" className={styles.textLink}>Browse Minecraft projects <span aria-hidden="true">↗</span></Link>
                    </aside>
                </div>
            </main>
        </Layout>
    );
}
