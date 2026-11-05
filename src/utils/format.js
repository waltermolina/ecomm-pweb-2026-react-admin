export function getRecord(response) {
  return response?.data ?? response?.item ?? response;
}

export function getRecordId(record) {
  return record?.id ?? record?._id;
}

export function getUserName(user) {
  return user?.name ?? user?.fullName ?? user?.email ?? 'Usuario';
}
