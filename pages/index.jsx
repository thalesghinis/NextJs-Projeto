import React, { useEffect, useState } from "react";
import Head from 'next/head';
import Tmdb from '../Tmdb';
import FeaturedMovie from '../components/FeaturedMovie';
import MovieRow from '../components/MovieRow';
import Header from '../components/Header';
import styles from '../styles/globals.module.css'
// import './styles.css'

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegar a lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // pegar o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
      {movieList.map((item, key) => (
        <MovieRow key={key} title={item.title} items={item.items}/>
      ))}
      </section>

      <footer className={styles.footer}>
        Estudo de React <br/>
        Streaming Clone  <br/>
        Api - TMDB
      </footer>

        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
          </div>
        }
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }

        .featured {
          height: 100vh;
      }
      
      .featured--vertical {
          width: inherit;
          height: inherit;
          background: linear-gradient(to top, #111 10%, transparent 90%);
      }
      
      .featured-horizontal {
          width: inherit;
          height: inherit;
          background: linear-gradient(to right, #111 30%, transparent 70%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 70px 0 150px 30px;
      }
      
      .featured--name {
          font-size: 60px;
          font-weight: bold;
      }
      
      .featured--info {
          font-size: 18px;
          font-weight: bold;
          margin-top: 15px;
      }
      
      .featured--points {
          color: #46d369;
      }
      
      .featured--points, .featured--year, .featured--seasons {
          display: inline-block;
          margin-right: 15px;
      }
      
      .featured--description {
          margin-top: 15px;
          font-size: 20px;
          color: #999;
          max-width: 50%;
      }
      
      .featured--buttons {
          margin-top: 15px;
      }
      
      .featured--watchbutton, .featured--mylistbutton {
          display: inline-block;
          font-size: 20px;
          font-weight: bold;
          padding: 12px 25px;
          border-radius: 5px;
          text-decoration: none;
          margin-right: 10px;
          opacity: 1;
      }
      
      .featured--watchbutton:hover, .featured--mylistbutton:hover {
          opacity: 0.7;
          transition: 0.3s;
      }
      
      .featured--watchbutton {
          background-color: #fff;
          color: #000;
      }
      
      .featured--mylistbutton {
          background-color: #333;
          color: #fff;
      }
      
      .featured--genres {
          margin-top: 15px;
          font-size: 18px;
          color: #999;
      }
      
      @media (max-width: 760px) {
          .featured {
              height: 90vh;
          }
      
          .featured--name {
              font-size: 40px;
          }
      
          .featured--info {
              font-size: 16px;
          }
      
          .featured--description {
              font-size: 14px;
              max-width: 100%;
              margin-right: 30px;
          }
          .featured--watchbutton, .featured--mylistbutton {
              font-size: 16px;
          }
          .featured--genres {
              font-size: 14px;
          }
      }
      
      header {
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          background: transparent;
          transition: 0.5s;
      }
      
      header.black {
          background-color: #141414;
      }

        .header--avatar {
          background-image: url(../../../public/images/user.png);
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 40px;
          height: 40px;
          border-radius: 20px;
      }
      
      .header--logo a {
          color: red;
          text-decoration: none;
          font-weight: bold;
          font-size: 30px;
      }
      .movieRow {
        margin-bottom: 30px;
    }
    
    .movieRow h2 {
        margin: 0 0 0 30px;
    }
    
    .movieRow--listarea {
        overflow-x: hidden;
        padding-left: 30px;
    }
    
    .movieRow--list {
        transition: 0.5s;
    }
    
    .movieRow--item {
        display: inline-block;
        width: 150px;
        cursor: pointer;
    }
    
    .movieRow--item img {
        width: 100%;
        transform: scale(0.9);
        transition: 0.3s;
    }
    
    .movieRow--item img:hover {
        transform: scale(1);
    }
    
    .movieRow--left, .movieRow--right {
        position: absolute;
        width: 40px;
        height: 225px;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
        transition: 0.5s;
    }
    
    .movieRow:hover .movieRow--left,
    .movieRow:hover .movieRow--right {
        opacity: 1;
    }
    
    .movieRow--right {
        right: 0;
    }
    
    .movieRow--left {
        left: 0;
    }
    
    @media (max-width:760px) {
        .movieRow-left .movieRow--right {
            opacity: 1;
        }
    }
    
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </div>
  )
}
