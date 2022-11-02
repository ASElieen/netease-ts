import React from "react";
import { HeaderContainer } from "./headerStyle";
import { MdArrowBackIosNew } from "react-icons/md";

interface ParamProps {
  handleClick?: () => void;
  title?: string;
  isMarquee: boolean;
  ref:any,
}

const AlbumHeader: React.FC<ParamProps> = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props;
  return (
    <HeaderContainer ref={ref as any}>
      <div className="svg_container">
        <MdArrowBackIosNew className="iconfont back" onClick={handleClick} />
      </div>
      {isMarquee ? (
        <div className="marquee">
          <h1>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

export default React.memo(AlbumHeader);
