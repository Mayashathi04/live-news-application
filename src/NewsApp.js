import React, { Component } from 'react';
import './NewsApp.css';

class NewsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const API_KEY = '54c44e09c320498280e999a943725c70'; 
    const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data.status === 'ok') {
        this.setState({ articles: data.articles, loading: false });
      }
    } catch (err) {
      this.setState({ error: "Failed to load", loading: false });
    }
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="app-container">
        <header className="app-header">
          <h1>LIVE NEWS</h1>
        </header>

        <main className="news-grid">
          {articles.map((news, index) => (
            <div key={index} className="news-card">
              {/* Source Tag in corner */}
              <div className="source-tag">{news.source.name}</div>
              
              <div className="image-container">
                <img src={news.urlToImage || 'https://via.placeholder.com/400x200'} alt="news" />
              </div>

              <div className="card-body">
                <h3>{news.title}</h3>
                <p>{news.description ? news.description.slice(0, 100) + "..." : "No description available"}</p>
                <p className="publish-info">By : {news.author || "Unknown"}</p>
                <p className="publish-info">Published At : {new Date(news.publishedAt).toISOString()}</p>
                
                <a href={news.url} target="_blank" rel="noreferrer" className="read-more">
                  READ MORE
                </a>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default NewsApp;