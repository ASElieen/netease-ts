import styled from "styled-components";
import commonStyle from "src/assets/globalStyle";

export const ProgressWrapper = styled.div`
height: 30px;
.bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,0.3);
    .progress{
        position: absolute;
        height: 100%;
        background: ${commonStyle['theme-color']};
    }
    .progress-btn-wrapper{
        position: absolute;
        left: -15px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn{
            position: relative;
            top: 7px;
            left: 7px;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 3px solid ${commonStyle['border-color']};
            border-radius: 50%;
            background: ${commonStyle['theme-color']};
        }
    }
}
`