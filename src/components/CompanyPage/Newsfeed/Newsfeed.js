import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import * as actions from '../../../actions/newsfeed';

import './style.scss';

class NewsFeed extends Component {

  componentDidMount() {
    const { fetchArticles, company } = this.props;
    // const query = company.name.toLowerCase();
    fetchArticles(company.name);
  }

  render() {
    const { articles } = this.props;
    return (
      <div className="newsfeed">
        <h3>
          News
        </h3>

        <ul className="articles-list">
          {
            articles.map((article) => {
              return (
                <a key={article.url} href={article.url} rel="noopener noreferrer" target="_blank">
                  <li className="article">
                    <div className="article-left">
                      <img src={article.urlToImage} />
                    </div>
                    <div className="article-right">
                      <span className="article-source">
                        { article.source.name }
                      </span>
                      <span className="article-published">
                        <Moment fromNow>
                           { article.publishedAt }
                        </Moment>
                      </span>

                      <h5 className="article-headline">
                        { article.title }
                      </h5>

                      <p className="article-preview">
                        { article.description }
                      </p>
                    </div>
                  </li>
                </a>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.newsfeed.articles,
    loadingArticles: state.newsfeed.loadingArticles,
    error: state.newsfeed.error,
  };
};

export default connect(mapStateToProps, actions)(NewsFeed);
