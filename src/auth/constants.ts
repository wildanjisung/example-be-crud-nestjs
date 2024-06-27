export const jwtConstants = {
  secret: 'process.env.JWT_SECRET' || '',
  private: 'process.env.JWT_PRIVATE' || '',
  public: 'process.env.JWT_PUBLIC' || ''
}