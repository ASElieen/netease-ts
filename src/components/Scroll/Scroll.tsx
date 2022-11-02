import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { debounce } from "../../api/customHooks";
import BScroll from "better-scroll";
import { ScrollContainer, PullDownLoading, PullUpLoading } from "./scrollStyle";
import Spinner from '../Loading/Spinner/Spinner'

interface ScrollProps {
  direction?: "vertical" | "horizental"; //滚动方向
  click?: boolean; //是否支持点击
  refresh?: boolean; //是否刷新
  onScroll?: Function; //滑动触发回调函数
  pullUp?: () => void; //上拉加载逻辑
  pullDown?: () => void; //下拉加载逻辑
  pullUpLoading?: boolean; //是否显示上拉loading效果
  pullDownLoading?: boolean; //是否显示下拉loading效果
  bounceTop?: boolean; //是否支持向上吸顶
  bounceBottom?: boolean; //是否支持向下吸顶
  children: React.ReactNode;
  className?: string;
}

export type PosType = {
  x: number;
  y: number;
};

const Scroll = forwardRef((props: ScrollProps, ref) => {
  const [bscroll, setBscroll] = useState<BScroll | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    direction = "vertical",
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true,
  } = props;

  const { pullUp, pullDown, onScroll } = props;

  const pullUpDebounce = debounce(pullUp as Function,2000)
  
  const pullDownDebounce = debounce(pullDown as Function,2000)

  //实例化bs
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scroll = new BScroll(scrollContainerRef.current, {
        scrollX: direction === "horizental",
        scrollY: direction === "vertical",
        probeType: 3,
        click,
        bounce: {
          top: bounceTop,
          bottom: bounceBottom,
        },
      });
      setBscroll(scroll);
    }
    return () => setBscroll(null);
  }, []);

  //刷新重新渲染
  useEffect(() => {
    if (refresh && bscroll) {
      bscroll.refresh();
    }
  });

  // 使得 Scroll 的父组件可以调用  ref.current.refresh & getBScroll
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bscroll) {
        bscroll.refresh();
        bscroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bscroll) {
        return bscroll;
      }
    },
  }));

  //绑定scroll事件
  useEffect(() => {
    if (!bscroll || !onScroll) return;
    bscroll.on("scroll", onScroll);
    return () => {
      bscroll.off("scroll", onScroll);
    };
  }, [onScroll, bscroll]);

  //手指上拉判断
  useEffect(() => {
    if (!bscroll || !pullUpDebounce) return;
    bscroll.on("scrollEnd", () => {
      //判断是否已经触底
      if (bscroll.y <= bscroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bscroll.off("scrollEnd");
    };
  }, [pullUp,pullUpDebounce, bscroll]);

  //手指下滑判断
  useEffect(() => {
    if (!bscroll || !pullDownDebounce) return;
    //判断下拉的动作
    bscroll.on("touchEnd", (pos: PosType) => {
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bscroll.off("touchEnd");
    };
  },[pullDown,pullDownDebounce,bscroll]);

  //上拉下拉的loading动画显示
  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      <PullUpLoading style={PullUpdisplayStyle}>
        <Spinner />
      </PullUpLoading>
      <PullDownLoading style={PullDowndisplayStyle}>
        <Spinner />
      </PullDownLoading>
    </ScrollContainer>
  );
});

export default Scroll;
