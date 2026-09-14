import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTransitionContext } from '../components/PageTransition';

export const usePageTransition = () => {
  const transitionContext = useContext(PageTransitionContext);
  const setIsTransitioning = transitionContext?.setIsTransitioning;
  const navigate = useNavigate();
  const TRANSITION_DURATION_MS = 150;

  const transitionTo = (path) => {
    if (setIsTransitioning) {
      setIsTransitioning(true);
    }

    setTimeout(() => {
      navigate(path);
    }, setIsTransitioning ? TRANSITION_DURATION_MS : 0);
  };

  return { transitionTo };
};
