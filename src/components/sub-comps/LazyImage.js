import useInView from "react-cool-inview";
import { Link } from "react-router-dom";

const LazyImage = ({ width, height, className, ...rest }) => {
  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

  return (
      <div ref={observe} style={{width, height}}>
        {inView && <img className={className} {...rest} style={{width, height}} />}
      </div>
  );
};

export default LazyImage;