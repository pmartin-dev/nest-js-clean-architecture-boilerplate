export abstract class Entity<EntityType> {
  public props: EntityType;

  constructor(props: EntityType) {
    this.props = props;
  }

  update(props: Partial<EntityType>) {
    this.props = { ...this.props, ...props };
  }
}
