import React from 'react';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const message = String(error?.message || 'Unknown app error');
    const lower = message.toLowerCase();
    const isChunkError =
      lower.includes('loading chunk') ||
      lower.includes('chunkloaderror') ||
      lower.includes('failed to fetch dynamically imported module');

    if (isChunkError) {
      try {
        const retried = sessionStorage.getItem('asr-boundary-retry') === '1';
        if (!retried) {
          sessionStorage.setItem('asr-boundary-retry', '1');
          window.location.reload();
          return;
        }
      } catch {
        // no-op
      }
    }

    this.setState({ message });

    // Keep logging minimal and informative for production debugging.
    // eslint-disable-next-line no-console
    console.error('App render error:', error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: '' });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-boot-fallback" role="alert">
          <div className="app-fallback-box">
            <p>Something went wrong while loading this page.</p>
            {this.state.message ? <p className="app-fallback-detail">{this.state.message}</p> : null}
            <button type="button" className="asr-btn asr-btn-primary" onClick={this.handleRetry}>
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
