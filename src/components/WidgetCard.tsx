import styled from 'styled-components';

const Card = styled.div`
  background-color: #ddd4b7;
  padding: 20px 30px 20px 30px;
  border-radius: 30px;
  margin: 20px;

  position: relative;
  transform: rotate(-0.4deg);

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 30px;
    width: 50px;
    height: 12px;
    background: #1f6e64;
    opacity: 0.6;
    transform: rotate(-2deg);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    right: 30px;
    width: 50px;
    height: 12px;
    background: #1f6e64;
    opacity: 0.6;
    transform: rotate(-2deg);
  }
`

const Title = styled.h1`
  color: #a2222b;
  text-align: left;
  font-family: monospace;
`

const CardBody = styled.div<{ $isGridWidget: boolean }>`
  text-align: left;
  font-size: 15px;
  margin: 0 20px 0 0;
`

type WidgetCardProps = React.PropsWithChildren<{
    title: string;
}>;

const WidgetCard = ({title, children}: WidgetCardProps) =>
    <Card>
        <Title>{title}</Title>
        <CardBody>{children}</CardBody>
    </Card>

export default WidgetCard;