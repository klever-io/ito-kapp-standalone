import React, { useState } from 'react';

import { ArrowLeft, ArrowRight } from 'assets/pagination';
import calculate from './paginate';
import { ArrowContainer, Container, ItemContainer } from './styles';
import PaginationModal from './PaginationModal';

interface IPagination {
  count: number;
  page: number;
  onPaginate(page: number): void;
}

const Pagination: React.FC<IPagination> = ({ count, page, onPaginate }) => {
  if (count >= 1000) count = 1000;
  const cells = calculate(count, page);

  const [showModalLeft, setShowModalLeft] = useState(false);
  const [showModalRight, setShowModalRight] = useState(false);

  const prevProps = {
    active: page > 1,
    onClick: () => {
      if (page > 0 && page > 1) {
        onPaginate(page - 1);
      }
    },
  };

  const nextProps = {
    active: page < count - 1,
    onClick: () => {
      if (page + 1 < count && page < count - 1) {
        onPaginate(page + 1);
      }
    },
  };

  const modalLeftController = () => {
    setShowModalLeft(!showModalLeft);
    if (showModalRight) {
      setShowModalRight(false);
    }
  };

  const modalRightController = () => {
    setShowModalRight(!showModalRight);
    if (showModalLeft) {
      setShowModalLeft(false);
    }
  };

  return (
    <Container>
      <ArrowContainer {...prevProps}>
        <img src={ArrowLeft} alt="arrow left" />
      </ArrowContainer>

      {cells.map(({ value, leftEllipsis, rightEllipsis }) => {
        const paginationProps = {
          totalPages: count,
          page,
          onPaginate,
        };

        const leftPaginationProps = {
          ...paginationProps,
          modalLeft: true,
          showModal: showModalLeft,
          setShowModal: setShowModalLeft,
        };

        const rightPaginationProps = {
          ...paginationProps,
          modalLeft: false,
          showModal: showModalRight,
          setShowModal: setShowModalRight,
        };

        if (leftEllipsis) {
          return (
            <div key={value}>
              <ItemContainer
                active={value === page + 1}
                onClick={() => modalLeftController()}
                onMouseDown={e => e.preventDefault()}
              >
                {' '}
                {'...'}
              </ItemContainer>
              <PaginationModal {...leftPaginationProps} />
            </div>
          );
        }

        if (rightEllipsis) {
          return (
            <div key={value}>
              <ItemContainer
                active={value === page + 1}
                onClick={() => modalRightController()}
                onMouseDown={e => e.preventDefault()}
              >
                {' '}
                {'...'}
              </ItemContainer>
              <PaginationModal {...rightPaginationProps} />
            </div>
          );
        }

        return (
          <ItemContainer
            key={value}
            active={value === page}
            onClick={() => value !== page && onPaginate(value - 1)}
          >
            <span>{value}</span>
          </ItemContainer>
        );
      })}
      <ArrowContainer {...nextProps}>
        <img src={ArrowRight} alt="arrow right" />
      </ArrowContainer>
    </Container>
  );
};

export default Pagination;
