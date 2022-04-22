import React from 'react';
import styled from '@emotion/styled';
import {
  Collapse as AntdCollapse,
  CollapseProps as AntdCollapseProps,
  CollapsePanelProps as AntdCollapsePanelProps,
} from 'antd';

export interface CollapseProps extends AntdCollapseProps {
  containerStyle?: any;
  containerClass?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export interface CollapsePanelProps extends AntdCollapsePanelProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const AntdCollapseWrapper = styled.div``;
export const AntdPanelWrapper = styled.div``;

export function Collapse({
  containerClass,
  containerStyle,
  children,
  ...rest
}: CollapseProps) {
  return (
    <AntdCollapseWrapper
      className={`${containerClass || ''}`}
      style={containerStyle}
    >
      <AntdCollapse {...rest}>{children}</AntdCollapse>
    </AntdCollapseWrapper>
  );
}
export function Panel({ children, ...rest }: CollapsePanelProps) {
  return <AntdCollapse.Panel {...rest}>{children}</AntdCollapse.Panel>;
}
