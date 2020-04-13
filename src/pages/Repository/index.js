import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Loading, Owner, IssueList, IssueFilter, Footer } from './styles';
import api from '../../services/api';

import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: '',
    issues: [],
    loading: true,
    issueFilter: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repositoryName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  isPageOne = () => {
    const { page } = this.state;
    return page === 1;
  };

  async changeIssueFilter(event) {
    const { repository, issueFilter } = this.state;
    const newIssueFilter = event.target.value;
    if (issueFilter !== newIssueFilter) {
      const response = await api.get(
        `/repos/${repository.owner.login}/${repository.name}/issues?state=${newIssueFilter}`
      );

      this.setState({
        issues: response.data,
        issueFilter: newIssueFilter,
      });
    }
  }

  async nextIssuePage() {
    const { repository, issueFilter, page } = this.state;

    const newPage = page + 1;

    const response = await api.get(
      `/repos/${repository.owner.login}/${repository.name}/issues?state=${issueFilter}&page=${newPage}`
    );

    this.setState({
      issues: response.data,
      page: newPage,
    });
  }

  async previousIssuePage() {
    const { repository, issueFilter, page } = this.state;

    const newPage = page - 1;

    const response = await api.get(
      `/repos/${repository.owner.login}/${repository.name}/issues?state=${issueFilter}&page=${newPage}`
    );

    this.setState({
      issues: response.data,
      page: newPage,
    });
  }

  render() {
    const { repository, issues, loading, issueFilter } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt="" />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilter>
          <span>Status das issues:</span>
          <select onChange={e => this.changeIssueFilter(e)} value={issueFilter}>
            <option value="all">Todas</option>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
          </select>
        </IssueFilter>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Footer>
          <button
            type="button"
            disabled={this.isPageOne()}
            onClick={() => this.previousIssuePage()}
          >
            Issues anteriores
          </button>
          <button type="button" onClick={() => this.nextIssuePage()}>
            Próximas issues
          </button>
        </Footer>
      </Container>
    );
  }
}
