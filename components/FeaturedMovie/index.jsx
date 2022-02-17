import React from "react";
import styles from './FeaturedMovie.module.css';

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres) {
        genres.push( item.genres[i].name );
    }

    let description = item.overview;
    if(description.length > 200) {
        description = description.substring(0, 200) + '...';
    }

    return (
        <section className={styles.featured} style={{
            backgroundSize: 'cover',
            backgroundPositions: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className={styles.featuredvertical}>
                <div className={styles.featuredhorizontal}>
                    <div className={styles.featuredname}>
                        {item.original_name}
                    </div>
                    <div className={styles.featuredinfo}>
                        <div className={styles.featuredpoints}>{item.vote_average} pontos</div>
                        <div className={styles.featuredyear}>{firstDate.getFullYear()}</div>
                        <div className={styles.featuredseasons}>
                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                        <div className={styles.featureddescription}>{item.overview}</div>
                        <div className={styles.featuredbuttons}>
                            <a className={styles.featuredwatchbutton} href={`/watch/${item.id}`}>Assistir</a>
                            <a className={styles.featuredmylistbutton} href={`/list/${item.id}`}>Minha Lista</a>
                        </div>
                        <div className={styles.featuredgenres}>Generos: {genres.join(', ')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

