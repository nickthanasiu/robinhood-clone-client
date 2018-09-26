import React from 'react';
import Moment from 'react-moment';
import LoadingSpinner from '../../LoadingSpinner';

import './style.scss';

const NewsFeed = props => (
  <div className="newsfeed">
    <h3>
      Recent News
    </h3>

    {
      props.loadingArticles ? <LoadingSpinner /> :
        (
          <ul className="articles-list">
            {
              props.articles.map((article) => {
                return (
                  <a
                    href={article.url}
                    rel="noopener noreferrer"
                    target="_blank"
                    key={article.publishedAt}
                  >
                    <li className="article">
                      <div className="article-left">
                        <img src={article.urlToImage} />
                      </div>
                      <div className="article-right">
                        <span className="article-source">
                          {`
                            ${article.source.name} on
                          `}
                          <span className="article-company">
                            { article.company }
                          </span>
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
        )
    }
  </div>
);

export default NewsFeed;
